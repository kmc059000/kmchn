export interface IStory {
    id: number,
    by: string,
    descendants: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string,
}
  
export interface IComment {
    id: number,
    by: string,
    kids: number[],
    text: string,
    time: number,
    type: string,
}
  