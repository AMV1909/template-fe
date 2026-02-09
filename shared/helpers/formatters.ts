export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const prettifyText = (sentence: string) =>
    capitalizeFirstLetter(sentence).replaceAll("_", " ");

export const formatQueryParams = (params: Record<string, any>) => {
    const query = Object.entries(params)
        .flatMap(([key, value]) => {
            if (Array.isArray(value))
                return value.map(
                    (v) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(v)}`,
                );

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");

    return query;
};
