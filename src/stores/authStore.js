import {create } from "zustand"

const useAuthStore = create((set) => ({
  is_logged_in: false,
  jwt: null,
  name: null,
  log_in: (token, name) => set((state) => ({is_logged_in: true, jwt: token, name: name})),
  log_out: () => set((state) => ({is_logged_in: false, jwt: null, name: null}))

}))

export default useAuthStore;