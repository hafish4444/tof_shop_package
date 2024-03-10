export default interface SearchParam {
    pakList: Array<string>
    userId: string
    channel: number | ""
    displayTimeout: number
    limit: number
}