import { makeAutoObservable } from 'mobx'
import { check as checkToken } from '../http/userAPI';
export default class UserStore {
    constructor() {
        this._user = [];
        this._currentUser = null;
        this._isAuth = false;
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }
    get user() {
        return this._user
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get isAuth() {
        return this._isAuth
    }
    //Сеттер и Геттер текущего пользователя
    setCurrentUser(currentUser) {
        this._currentUser = currentUser
    }

    get currentUser() {
        return this._currentUser
    }

    // Функция проверки токена и авторизации
    async check() {
        try {
            const decodedToken = await checkToken(); 
            this.setUser(decodedToken);  
            this.setIsAuth(true); 
        } catch (error) {
            this.setIsAuth(false);  
            this.setUser({});  
            console.error('Ошибка при проверке токена:', error.message);
        }
    }
}
