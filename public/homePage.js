const logout = new LogoutButton();

logout.action = function () {
    ApiConnector.logout((response) => {
        if(response.success){
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
});

const rates = new RatesBoard();

function ratesFunc(){
    ApiConnector.getStocks((response) => {
        if(response.success){
            rates.clearTable();
            rates.fillTable(response.data);
        }
    });
}

ratesFunc();

setInterval(ratesFunc,60000);

const money = new MoneyManager();

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, ((response) => {
        // console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Пополнено");
        }
        else {
            money.setMessage(false, response.error);
        }
    }))
};

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Конвертировано");
        }
        else {
            money.setMessage(false, response.error);
        }
    })
};

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, ((response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Переведено");
        }
        else {
            money.setMessage(false, response.error);
        }
    }))
};

const favorites = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
})

favorites.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favorites.setMessage(true, "Добавлено");
        }
        else {
            favorites.setMessage(false, response.error);
        }
    })
}

favorites.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favorites.setMessage(true, "Удалено");
        }
        else {
            favorites.setMessage(false, response.error);
        }
    })
}


