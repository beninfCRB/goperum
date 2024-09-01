import { create } from 'zustand';

export interface MenuState {
    menu: string|undefined,
    setSelectedMenu: (value: string) => void,
}

const MenuStore = create<MenuState>((set) => ({
    menu: undefined,
    setSelectedMenu: (value:string) => set({
        menu: value
    }),
}))

export default MenuStore