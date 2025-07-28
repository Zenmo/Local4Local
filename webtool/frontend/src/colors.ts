import Color from "color"

// colors extracted from Local4Local.nu website
export const local4localLightBlue = "#99C5EA"
export const local4localDarkBlue = "#02345E"
export const local4localDarkOrange = "#DB6E1E"
export const local4localLightOrange = "#EFB72C"
export const local4localLightGreen = "#AED3B3"

// extended colors in this project
export const local4localGreen = Color(local4localLightGreen).darken(.2).hex()
export const local4localBlue = Color(local4localLightBlue).darken(.1).hex()
