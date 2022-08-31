// get now in seconds
export const timestampInSeconds = (): number => {
    return Math.floor(new Date().getTime() / 1000);
}

export const isExpiredInSeconds = (expiredAt: number): boolean => {
    return (timestampInSeconds() > expiredAt);
}