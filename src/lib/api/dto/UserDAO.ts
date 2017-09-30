export interface PublicUserDAO {
    displayName: string,
    fbId?: string,
    _id: string,
}
export interface UserDAO extends PublicUserDAO {
}