export interface TokenService<DATA_TO_GENERATE, EXPORT_TYPE> {
    checkToken(token: string): Promise<EXPORT_TYPE>;
    generateToken(value: DATA_TO_GENERATE): Promise<EXPORT_TYPE>;
    refreshToken(token: string): Promise<EXPORT_TYPE>;
    decodeToken(token: string): Promise<DATA_TO_GENERATE>
}
