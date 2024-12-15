import { User } from "./user"

export type Action = {
    type: 'CREATE' | 'UPDATE' | 'RETRIEVAL'|'DELETE'
    data: Partial<User>
}