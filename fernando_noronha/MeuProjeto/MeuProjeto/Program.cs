using System;

public static class DiffieHellman
{
    public static int primeP() => 5;
    public static int primeG() => 7;
    public static int PrivateKey(int primeP){
        return primeP;
    }
class Program
{
    static void Main()
    {
        GameOfLife game = new GameOfLife();
        int[,] matrix = new int[5, 5]
        {
            { 0, 0, 0, 0, 0 },
            { 0, 1, 1, 0, 0 },
            { 0, 1, 1, 0, 0 },
            { 0, 0, 0, 0, 0 },
            { 0, 0, 0, 0, 0 }
        };
        int[,] result = game.Tick(matrix);
    }
}
