export interface Comment {
    content: string;
    opinion?: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    image_list: string[];
    tags: string[];
    comments: Comment[];
}

export interface NoteTag {
    noteId: string;
    noteOpinion: string;
    commentOpinions: string[];
}

export interface TagData {
    [noteId: string]: NoteTag;
} 