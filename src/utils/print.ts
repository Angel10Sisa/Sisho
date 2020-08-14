// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

function terminal(): { width: number; height: number } {
  let width = Number(process.stdout.columns)
  const height = Number(process.stdout.rows)

  if (width % 2 !== 0) width -= 1
  return { width, height }
}

function multiplier(character: string, quantity: number): string {
  let result = ''
  for (let index = 0; index < quantity; index++) {
    result = `${result}${character}`
  }

  return result
}

export const message = {
  titlebox: (msg: string): string => {
    const { width } = terminal()
    const LINE = multiplier('*', width)
    const BLANK = multiplier(' ', (width - msg.length) / 2 - 1)
    return `\n${LINE}\n*${BLANK}\x1b[36m${msg}\x1b[0m${BLANK}*\n${LINE}\n`
  },
  titleline: (msg: string): string => {
    const { width } = terminal()
    const LINE = multiplier('-', (width - msg.length) / 2 - 2)
    return `\n${LINE}< \x1b[36m${msg}\x1b[0m >${LINE}\n`
  }
}

export const print = {
  titlebox: (msg: string) => {
    console.log(message.titlebox(msg))
  },

  titleline: (msg: string) => {
    console.log(message.titleline(msg))
  }
}
