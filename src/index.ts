import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import TabbyCoreModule, { AppService, HostWindowService } from 'tabby-core'
import Activity, { updateInfo, updateIdleInfo } from './activity'

Activity()
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabbyCoreModule
    ],
    providers: [
    ],
    entryComponents: [
    ],
    declarations: [
    ],
})

export default class DiscordPresence { 
    constructor (
        app: AppService,
        window_service: HostWindowService
    ) {

        window_service.windowFocused$.subscribe(() => {
            updateIdleInfo()
        })

        window_service.windowMoved$.subscribe(() => {
            updateIdleInfo()
        })

        window_service.windowCloseRequest$.subscribe(() => {
            updateIdleInfo()
        })

        window_service.windowShown$.subscribe(() => {
            updateIdleInfo()
        })

        setInterval(() => {
            console.log(app.activeTab.title)
            console.log("focus?", app.activeTab.focused$)
            console.log("activity?", app.activeTab.hasActivity)
            console.log("has focus?", app.activeTab.hasFocus)

            updateInfo(app.activeTab.title, app.tabs.length)
        }, 5000)
    }
}

