import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { CreatePollComponent } from './poll/create-poll/create-poll.component';
import { VotePollComponent } from './poll/vote-poll/vote-poll.component';
import { PollResultComponent } from './poll/poll-result/poll-result.component';
import { PasswordComponent } from './password/password.component';
import { TranslateService } from '@ngx-translate/core';


const keywords = 'jugement majoritaire, vote alternatif, scrutin, organiser, condorcet, borda';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Router.HomeTitle',
            metatags: {
                description: 'Router.HomeDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Router.LoginTitle',
            metatags: {
                description: 'Router.LoginDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'password',
        component: PasswordComponent,
        data: {
            title: 'Router.PasswordTitle',
            metatags: {
                description: 'Router.PasswordDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'password/:c',
        component: PasswordComponent,
        data: {
            title: 'Router.PasswordTitle',
            metatags: {
                description: 'Router.PasswordDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'poll',
        component: PollListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Router.PollTitle',
            metatags: {
                description: 'Router.PollDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'poll/create',
        component: CreatePollComponent,
        data: {
            title: 'Router.PollCreateTitle',
            metatags: {
                description: 'Router.PollCreateDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'poll/:guid',
        component: VotePollComponent,
        data: {
            title: 'Router.VoteTitle',
            metatags: {
                description: 'Router.VoteDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'poll/:guid/result',
        component: PollResultComponent,
        data: {
            title: 'Router.ResultTitle',
            metatags: {
                description: 'Router.ResultDescription',
                keywords: keywords
            }
        }
    },
    {
        path: 'p/:token',
        component: VotePollComponent,
        data: {
            title: 'Router.VoteTitle',
            metatags: {
                description: 'Router.VoteDescription',
                keywords: keywords
            }
        }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
