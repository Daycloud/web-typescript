export interface ISettingsDTO {
    whoCanCick: PermissionLevel;
    whoCanInvite: PermissionLevel;
    isSearchIndexed: boolean;
}

enum PermissionLevel {
    Administrators = 'ADMINISTRATORS'
}