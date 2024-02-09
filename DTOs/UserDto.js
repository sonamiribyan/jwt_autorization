class UserDto {
    constructor(email, password, activationLink = '') {
        this.email = email;
        this.password = password;
        this.activationLink = activationLink;
    }
}

export default UserDto;
