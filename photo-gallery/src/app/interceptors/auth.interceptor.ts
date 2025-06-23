//L'interceptor serve per inviare automaticamente il token al back-end senza doverlo aggiungere manualmente

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (req.url.includes('/login-admin') || 
      req.url.includes('/registrazione-cliente') || 
      req.url.includes('/login-cliente')) {
    console.log("Richiesta di registrazione o login");

    // let clonedReq = req;
    
    // clonedReq = req.clone({
    //   setHeaders: {
    //     'Content-Type':'application/json',
    //   }
    // })

    return next(req).pipe(
      tap(response => console.log("Registrazione completata con successo: dati inviati", req)),
      catchError(httpError => {
        console.log("Errore nella richiesta di registrazione:", httpError);
        return throwError(() => httpError);
      })
    );
  }


  //Poiché le due funzioni restituiscono una Promise, vengono trasformate in un Observable e gestite da switchMap (grazie a pipe)
       return from(Promise.all([tokenService.isTokenExpired().catch(e=>{
        console.log("Errore in isTokenExpired;: ", e);
        return true;
       })
        ,tokenService.getToken().catch(e=>{
          console.log("Errore in getToken: ", e);
        })
      ])).pipe(
        //Restituisce un messaggio di sucesso o di errore in base al risultato delle due Promise
        tap(()=> console.log("Promise completate con successo!")),
        catchError(promiseError =>{
          console.log("Errore nella Promise: ", promiseError);
          return throwError(() => promiseError);
        }),
        switchMap(([isExpired, token]) => {
          //Se il token è presente verifica prima che non sia scaduto
          if (token) {
            
            //Se è scaduto reindirizza al login
            if(isExpired){ 
              console.log('Token scaduto! Reindirizzamento al login');
              logout(tokenService, router);
              return throwError(() => new Error('Token scaduto'));
            }
            //Altrimenti lo aggiunge alla richiesta
            console.log("Effettuando la richiesta con token...");
            let clonedReq = req;
            console.log("Richiesta originaria: ", req.headers.keys);
            clonedReq = req.clone({
              setHeaders: {
                Authorization:`Bearer ${token}`,
              }
            })
            console.log("Headers nella richiesta clonata:", clonedReq.headers.keys().map(k => `${k}: ${clonedReq.headers.get(k)}`));
            console.log("Campo authorization clonedReq: ", clonedReq.headers.has('Authorization'));

            return next(clonedReq).pipe(
              tap(response => console.log("Richiesta effettuata con successo!")),
              catchError(httpError => {
                console.log("Errore nella richiesta http", httpError);
                throw httpError;
              }
              )
            )

          }else{ //Se il token non è presente lascia la richiesta così com'è
            console.log("Effettuando la richiesta senza token...");
            return next(req).pipe(
              tap(response => console.log("Richiesta effettuata con successo!")),
              catchError(httpError => {
                console.log("Errore nella richiesta http", httpError);
                throw httpError;
              }
              )
            )//Se il token era necessario per la richiesta sarà il server a restituire un messaggio di errore
          }
        }),
        catchError(error => {
          if (error.status === 401) {
            console.log('Token scaduto. Siamo nel catchError finale');
            logout(tokenService, router);
          }
          return throwError(() => error);
        })
      );

  //Funzione che reinderizza al login se il token è scaduto o mancante    
  async function logout(tokenService: any, router: Router) {
    await tokenService.logout();
    router.navigate(['/tabs/tab3']);
  }
};
