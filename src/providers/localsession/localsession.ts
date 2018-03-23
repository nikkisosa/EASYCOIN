import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LocalsessionProvider {
  //public base_url: string = 'http://192.168.1.2/esy-coin/';
  public base_url: string = 'http://hyperloop.servehttp.com/esy-coin/';
  private name:any;
  private id:any;
  private phone:any;
  private email:any;
  private address: any;
  private dob: any;
  private priv_key: any;
  private balance: any;
  private token: any;
  private pin: any;
  private key:any;
  private is_loggedin:any;
  constructor(public http: Http) {
  }

  /*
   * get local storage
   * dont change function name. leave it as is
  */

  public get_local_loggedin(){
    return localStorage.getItem('is_loggedin');
  }
  public get_local_bitcoin() {
    return localStorage.getItem('btc');
  }

  public get_local_id(){
    return localStorage.getItem('id');
  }

  public get_local_account_id(){
    return localStorage.getItem('account_id');
  }

  public get_local_name() {
    return localStorage.getItem('name');
  }

  public get_local_lname() {
    return localStorage.getItem('lname');
  }

  public get_local_mname() {
    return localStorage.getItem('mname');
  }

  public get_local_phone() {
    return localStorage.getItem('phone');
  }

  public get_local_email() {
    return localStorage.getItem('email');
  }

  public get_local_verified_email() {
    return localStorage.getItem('verified_email');
  }

  public get_local_address() {
    return localStorage.getItem('address');
  }

  public get_local_verified_address() {
    return localStorage.getItem('verified_address');
  }

  public get_local_verified_kyc() {
    return localStorage.getItem('verified_kyc');
  }

  public get_local_date_of_birth() {
    return localStorage.getItem('dob');
  }

  public get_local_balance() {
    return localStorage.getItem('balance');
  }

  public get_local_priv_key() {
    return localStorage.getItem('priv_key');
  }

  public get_local_token() {
    return localStorage.getItem('token');
  }

  public get_local_pin(){
    return localStorage.getItem('pin');
  }

  public get_local_partners() {
    return localStorage.getItem('partners');
  }

  public get_local_partners_id() {
    return localStorage.getItem('partners_id');
  }

  public get_local_key() {
    return localStorage.getItem('key');
  }

  public 

  /**
   * dont change function name. leave it as is
   * set compiled local storage
   * @param id
   * @param name
   * @param phone
   * @param email
   * @param address
   * @param dob
   * @param balance
   * @param private key = priv_key
   * @param token
  */
  public set_compiled_value(id: any = '', name: any = '', lname: any = '', mname: any = '', phone: any = '', email: any = '', address: any = '', dob: any = '',balance: any ='',priv_key: any ='',token: any =''){
    this.set_local_id(id);
    this.set_local_name(name);
    this.set_local_lname(lname);
    this.set_local_mname(mname);
    this.set_local_phone(phone);
    this.set_local_address(address);
    this.set_local_email(email);
    this.set_local_balance(balance);
    this.set_local_date_of_birth(dob);
    this.set_local_token(token);
    this.set_local_priv_key(priv_key);
  }


  /**
   * set localstorage
   * @param session value
  */

  public set_local_loggedin(is_loggedin:any) {
    this.is_loggedin = localStorage.setItem('is_loggedin',is_loggedin);
  }

  public set_local_bitcoin(btc: any) {
    this.id = localStorage.setItem('btc', btc);
  }


  public set_local_id(id:any){
    this.id = localStorage.setItem('id',id);
  }

  public set_local_account_id(account_id:any){
    this.id = localStorage.setItem('account_id',account_id);
  }

  public set_local_name(name:any) {
    this.name = localStorage.setItem('name', name);
  }

  public set_local_mname(mname: any) {
    this.name = localStorage.setItem('mname', mname);
  }

  public set_local_lname(lname: any) {
    this.name = localStorage.setItem('lname', lname);
  }

  public set_local_phone(phone: any) {
    this.phone = localStorage.setItem('phone', phone);
  }

  public set_local_email(email: any) {
    this.email = localStorage.setItem('email', email);
  }

  public set_local_verified_email(verified_email: any) {
    this.address = localStorage.setItem('verified_email', verified_email);
  }

  public set_local_address(address: any) {
    this.address = localStorage.setItem('address', address);
  }

  public set_local_verified_address(verified_address: any) {
    this.address = localStorage.setItem('verified_address', verified_address);
  }

  public set_local_verified_kyc(verified_kyc: any) {
    this.address = localStorage.setItem('verified_kyc', verified_kyc);
  }

  public set_local_date_of_birth(dob: any) {
    this.dob = localStorage.setItem('dob', dob);
  }

  public set_local_balance(balance: any) {
    this.balance = localStorage.setItem('balance', balance);
  }

  public set_local_priv_key(priv_key: any) {
    this.priv_key = localStorage.setItem('priv_key', priv_key);
  }

  public set_local_token(token: any) {
    this.token = localStorage.setItem('token', token);
  }

  public set_local_pin(pin:any) {
    this.pin = localStorage.setItem('pin',pin);
  }

  public set_local_partners(partners) {
    return localStorage.setItem('partners', partners);
  }

  public set_local_partners_id(partners_id) {
    return localStorage.setItem('partners_id', partners_id);
  }

  public set_local_key(key) {
    return localStorage.setItem('key', key);
  }

}
