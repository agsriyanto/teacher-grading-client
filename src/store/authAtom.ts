import { atom } from "jotai";
import { User } from "../types";

const storedUser = localStorage.getItem("user");
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

export const authAtom = atom<string | null>(localStorage.getItem("accessToken"));
export const userAtom = atom<User | null>(parsedUser);