import { Component } from "@angular/core";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
    user = {
        userName: '',
        nickname: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: ''
    };

    showPassword = false;
    showConfirmPassword = false;

    togglePassword() {
        this.showPassword = !this.showConfirmPassword;
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onSubmit() {
        if (this.user.userPassword !== this.user.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        //AuthService로 회원가입 요청
        console.log('회원가입 요청', this.user);
    }
}