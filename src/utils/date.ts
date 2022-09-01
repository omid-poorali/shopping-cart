// get now in seconds
export const getUnixTime = (): number => {
    return Math.floor(new Date().getTime() / 1000);
}

export const isUnixExpired = (expiredAt: number): boolean => {
    return (getUnixTime() > expiredAt);
}

export const secondsToMinutes = (time: number): number => {
    return Math.floor(time / 60);
}