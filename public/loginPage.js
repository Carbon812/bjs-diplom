"use strict";

const user = new UserForm();

user.loginFormCallback = function(data) {

    ApiConnector.login(data, (response) => {
        if(response.success){
            location.reload();
        }else{
            user.setLoginErrorMessage(response.error);
        }
    });

}

user.registerFormCallback = function (data) {
    ApiConnector.register(data, (response) => {
        if(response.success){
            location.reload();
        }else{
            user.setRegisterErrorMessage(response.error);
        }
    });
}




