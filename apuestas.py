#Juego de apuestas usando la libreria stats, ademas, se tomara en cuenta si el numero del dado es par, se le 
# dara el doble lo ganado, sino, no gano, se repetira 1000 veces, y se mostrara las probabilidades de que 
#hubiera ganado y de que hubiera perdido

import random as rd

#se crea la funcion que se usara para el juego
def apuesta(cantApuesta, cartera):
    '''Funcion que realiza la apuesta, si el dado es par, se le dara el doble lo ganado,
      sino, no gano, se resta del total de la cartera con el valor de la apuesta 
'''
    cantVeces = 1000
    cartPerdidas = 0
    carteraAcum = 0
    cantGanadas = 0
    cantPerdidas = 0
    for i in range(cantVeces):
        dado = rd.randint(1,6)
        if dado % 2 == 0:
            carteraAcum += 2 * cantApuesta
            cantGanadas += 1
        else:
            cartera -= cantApuesta
            cartPerdidas += cantApuesta
            cantPerdidas += 1
    cartera += carteraAcum
    return cartera, cantPerdidas, cantVeces, carteraAcum, cantGanadas, cartPerdidas

def probabilidades(resultadosApuestas):
    '''Funcion que muestra las probabilidades de que gane, que pierda y que se acumule la cartera, ademas, se 
    muestra el resultado final de la cartera'''
    cantPerdidas = resultadosApuestas[1]
    cantVeces = resultadosApuestas[2]
    carteraAcum = resultadosApuestas[3]
    probGanadas = resultadosApuestas[4] / cantVeces
    probPerdidas = cantPerdidas / cantVeces
    print('La probabilidad de que gane es: ', probGanadas)
    print('La probabilidad de que pierda es: ', probPerdidas)
    print('El resultado acumulado es: ', carteraAcum)
    print(f'La cantidad perdida en el juego es de: -{resultadosApuestas[5]}$')
    print(f'El resultado final de la cartera es: {resultadosApuestas[0]}$') 



cartera = int(input('Ingrese la cantidad en su cartera:'))
cantInicial = int(input('Ingrese la cantidad a apostar: '))

resultadosApuestas = apuesta(cantInicial, cartera)
probabilidades(resultadosApuestas)
