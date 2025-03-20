export interface NoteTag {
    noteId: string;
    noteOpinion: string;
    commentOpinions: string[];
}

export interface TagData {
    [noteId: string]: NoteTag;
} 