export default class ToDoTO {
    id : number = 0;
    name : string = '';
    completed : boolean = false;
    
    constructor(id: number, name: string, completed: boolean) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
}