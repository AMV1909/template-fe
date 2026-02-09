export const clearFalsyData = <T extends object>(data: T): Partial<T> =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => !!value),
    ) as Partial<T>;
