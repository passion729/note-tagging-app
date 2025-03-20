import { TagData } from '../types';

const STORAGE_KEY = 'note_tagging_data';

export const saveTagData = (data: TagData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadTagData = (): TagData => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
};

export const clearTagData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.clear();
};

export const isAllNotesTagged = (data: TagData, totalNotes: number): boolean => {
    return Object.keys(data).length === totalNotes;
}; 