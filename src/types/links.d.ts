export interface ILink {
    linkId: string,
    active: boolean,
    createdAt: string,
    expiresIn: string | null
    originalLink: string,
    userId: string,
    visits: number
}

export interface IResponse {
    Count: number
    Items: ILink[]
}

export interface IShortLink {
    shortLink: string
}

export interface ILink {
    link: string
    expiresIn: string | null
}

export interface ILinkId {
    linkId: string
}