export const decodeToken = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
    }
};

export const isTokenExpired = (token: string) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;
    
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};