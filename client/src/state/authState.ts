import { atom, selector } from "recoil";



export const authState = atom({
        key:'authState',
        default: {
            id: null,
            name: null,
            email: null,
            token: null
        },
});

export const isAuthenticatedState = selector({
    key: 'isAuthenticatedState',
    get: ({ get }) => {
        const auth = get(authState);
        return !!auth.token;
        
    }
})