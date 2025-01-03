import { User } from "./user"

export type Action = {
    type: 'LOGUP' | 'UPDATE' | 'RETRIEVAL'|'DELETE'|'LOGIN' |'CREATE'
    data: Partial<User>
}