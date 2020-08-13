// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core'
import { Application } from './application'
import { PermissionRepository, CompanyRepository } from './repositories'
import { ProfileRepository } from './repositories'
import { ModuleRepository } from './repositories'
import { RoleRepository } from './repositories'
import { OptionRepository } from './repositories'
import { UserRepository } from './repositories'
import { PasswordBindings } from './keys'
import { BcryptHasher } from './services'
import { DEFAULT_ADMIN_ROLE } from './configs'
import { DEFAULT_PROFILE } from './configs'
import { DEFAULT_MODULES } from './configs'
import { DEFAULT_OPTIONS } from './configs'
import { DEFAULT_ADMIN } from './configs'

/**
 * Migrate defaults to the database
 */
class Migrate {
  private app: Application
  //private adminRoleId = 0

  @inject(PasswordBindings.ROUNDS) private readonly rounds: number
  public bcrypt: BcryptHasher
  constructor() {
    this.bcrypt = new BcryptHasher(this.rounds)
  }

  /**
   * Migrate database schema and defaults
   */
  public async migrate(existingSchema: 'drop' | 'alter'): Promise<void> {
    await this.initApp()

    // Migrate schema
    await this.createDB(existingSchema)

    // Migrate defaults
    await this.saveDefaultCompany()
    const options = await this.saveDefaultOptions()
    const modules = await this.saveDefaultModules()
    const roleAdmin = await this.saveDefaultRoleAdmin()
    const user = await this.saveDefaultAdmin(roleAdmin.id)
    const permissions = await this.saveDefaultPermissions(roleAdmin.id)

    this.printValueMigrated('Options', options)
    this.printValueMigrated('Modules', modules)
    this.printValueMigrated(
      'Role',
      roleAdmin.migrated
        ? {
            id: roleAdmin.id,
            name: roleAdmin.name,
            description: roleAdmin.description
          }
        : undefined
    )
    this.printValueMigrated('Permissions', permissions)
    this.printValueMigrated('user', user)

    // stop app
    await this.app.stop()
  }

  /**
   * Migrate default company
   */
  private async saveDefaultCompany(): Promise<void> {
    const repo = await this.app.getRepository(CompanyRepository)
    if ((await repo.count()).count === 0) {
      await repo.create({ name: 'sisho', address: 'Company address' })
    }
  }

  /**
   * Migrate defaults options
   */
  private async saveDefaultOptions(): Promise<object | undefined> {
    const repo = await this.app.getRepository(OptionRepository)
    /*const saved: object[] = []
    if ((await repo.count()).count === 0) {
      const result = await repo.createAll(DEFAULT_OPTIONS)

      result.forEach(element => {
        saved.push({
          id: element.id,
          group: element.group,
          name: element.name
        })
      })
    }*/

    const saved: object[] = []

    for (const element of DEFAULT_OPTIONS) {
      const stored = await repo.findOne({
        where: { and: [{ name: element.name }, { group: element.group }] }
      })

      if (!stored) {
        {
          const result = await repo.create(element)
          saved.push({
            id: result.id,
            group: result.group,
            name: result.name
          })
        }
      }
    }
    return saved.length > 0 ? saved : undefined
  }

  /**
   * Migrate defaults modules
   */
  private async saveDefaultModules(): Promise<object | undefined> {
    const repo: ModuleRepository = await this.app.getRepository(ModuleRepository)
    const saved: object[] = []

    for (const element of DEFAULT_MODULES) {
      if (!(await repo.exists(element.id))) {
        const result = await repo.create(element)
        saved.push({
          id: result.id,
          name: result.name
        })
      }
    }

    return saved.length > 0 ? saved : undefined
  }

  /**
   * Migrate default admin role
   */
  private async saveDefaultRoleAdmin(): Promise<{
    id: number
    name: string
    description: string
    migrated: boolean
  }> {
    const repo: RoleRepository = await this.app.getRepository(RoleRepository)
    let wasMigrated = false
    if (!(await repo.exists(1))) {
      await repo.create(DEFAULT_ADMIN_ROLE)
      wasMigrated = true
    }

    return {
      id: 1,
      migrated: wasMigrated,
      name: DEFAULT_ADMIN_ROLE.name,
      description: DEFAULT_ADMIN_ROLE.description
    }
  }

  /**
   * Migrate default admin user.
   * @param roleId
   */
  private async saveDefaultAdmin(roleId: number): Promise<object | undefined> {
    const userRepo: UserRepository = await this.app.getRepository(UserRepository)
    const profileRepo: ProfileRepository = await this.app.getRepository(ProfileRepository)
    const saved: { profile?: object; user?: object } = {}
    if (!(await userRepo.exists(1))) {
      const admin = DEFAULT_ADMIN

      const profileRst = await profileRepo.create(DEFAULT_PROFILE)

      if (profileRst) {
        const password: string = admin.password ?? ''
        admin.password = await this.bcrypt.encrypt(password)
        admin.roleId = roleId
        admin.profileId = profileRst.id ?? 0
        const userRst = await userRepo.create(admin)

        saved.user = { id: userRst.id, emailAddress: userRst.email, password }
        saved.profile = { lastName: profileRst.lastName, firstName: profileRst.firstName }
      }
    }
    return saved.user && saved.profile ? saved : undefined
  }

  /**
   * Migrate defaults permissions
   */
  private async saveDefaultPermissions(roleId: number): Promise<object | undefined> {
    const repo: PermissionRepository = await this.app.getRepository(PermissionRepository)
    const saved: object[] = []

    for (const element of DEFAULT_MODULES) {
      const stored = await repo.findOne({
        where: { and: [{ roleId }, { moduleId: element.id }] }
      })
      if (!stored) {
        const result = await repo.create({
          createdBy: 0,
          roleId: roleId,
          moduleId: element.id,
          create: true,
          read: true,
          update: true,
          delete: true
        })
        saved.push({
          id: result.id,
          roleId: result.roleId,
          moduleId: result.moduleId,
          permission:
            `${result.create ? 'C' : '_'}` +
            `${result.read ? 'R' : '_'}` +
            `${result.update ? 'U' : '_'}` +
            `${result.delete ? 'D' : '_'}`
        })
      }
    }

    return saved.length > 0 ? saved : undefined
  }

  /**
   * Migrate database schema.
   * @param existingSchema
   */
  private async createDB(existingSchema: 'drop' | 'alter'): Promise<void> {
    await this.app.migrateSchema({ existingSchema })
  }

  /**
   * Init the application
   */
  private async initApp(): Promise<void> {
    const app = new Application({})

    await app.boot()
    await app.start()

    this.app = app
  }

  /**
   * Print result from migrate default values.
   * @param title
   * @param migrated
   */
  private printValueMigrated(title: string, migrated?: object) {
    if (migrated) {
      console.log(
        '\n\n\x1b[1m--------------------------------< \x1b[0m' +
          `\x1b[36m ${title} \x1b[0m` +
          '\x1b[1m>--------------------------------\x1b[0m\n'
      )

      if (migrated instanceof Array) {
        migrated.forEach(element => {
          console.log(element)
        })
      } else {
        console.log(migrated)
      }
    }
  }
}

/**
 * Migrate defaults to the database
 */
async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter'
  console.log('Migrating schemas (%s existing schema)', existingSchema)

  await new Migrate().migrate(existingSchema)

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0)
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err)
  process.exit(1)
})
