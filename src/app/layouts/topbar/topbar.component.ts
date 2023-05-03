import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../account/auth/auth.service";
import { environment } from "../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { LanguageService } from "../../core/services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { ProfileService } from "../sidebar/sidebar.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  account: any;
  checkLogoText: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authFackservice: AuthService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService,
    private profileService: ProfileService
  ) {}

  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    {
      text: "VietNam",
      flag: "assets/images/flags/vietnamese.png",
      lang: "es",
    },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get("lang");
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = "assets/images/flags/us.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.account = data;
    });
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.checkLogoText = !this.checkLogoText;
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    if (environment.defaultauth === "firebase") {
      // this.authService.logout();
    } else {
      this.authFackservice.logout();
    }
    this.router.navigate(["/account/login"]);
  }
}
