export class UserEntity {
  name: string;
  username: string;
  email: string;
  password: string;
  student: boolean;
  teacher: boolean;
  constructor(name: string, 
    username: string, 
    email: string, 
    password: string, 
    student: boolean, 
    teacher: boolean) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.student = student;
    this.teacher = teacher;
  }
}