// let name: string  = "carlos jaime" 

// let idade: number = 29

// let active: boolean = true

// let cidade: object = {
//     name: "extrema",
//     uf: "mg"
// }

// let valor: any = true

// let numeros: Array<number> = [1,2,3,4]
// let numeros2: number[] = [1,2,3,4]

// let nomes: string[] = ['carlos', 'paulo']

// let nomesIdades: any[] = [1, "asdas"]

// const cidades: object[] = [
//     {
//         name: "extrema",
//         uf: "mg"
//     },
//     {
//         name: "bragança paulista",
//         uf: "sp"
//     }
// ]

// interface Pessoa {
//     nome: string,
//     idade?: number
// }

// const pessoa: Pessoa = {
//     nome: "carlos"
// }

// const pessoas: Pessoa[] = [
//     {
//         nome: "otavio"
//     },
//     {
//         nome: "carlos"
//     }
// ]

// interface Banco {
//     conta: string,
//     value: number
// }

// interface Pessoa extends Banco {
//     nome: string
// }

// const pessoa: Pessoa = {
//     conta: "2323",
//     value: 323232,
//     nome: "carlos"
// }

// type Carro1 = {
//     nome: string
// }

// type Carro2 = {
//     ano: string
// }

// type Carro = Carro1 | Carro2

// const carro: Carro = {
//     ano: "bmw"
// }

// const nome: string | boolean = "asdas"

// interface User {
//     nome: string,
//     idade: number,
//     password: string
// }

// const user: User = {
//     nome: "carlos",
//     idade: 2132,
//     password: 'asdkasdkasdopaskjdpo'
// }

// const user2: Partial<User> = {
//     nome: "carlos"
// }

// type Partial2<T> = {
//     value: T
// }

// const livro: Partial2<string> = {
//     value: "nome do livro"
// }

// const numero: Partial2<number> = {
//     value: 1
// }

// interface Partial2<T> {
//     value: T
// }

// const message = <T>(message: T): T => {
//     return message
// }


// message<string>('ola mundo')
// message<number>(1)