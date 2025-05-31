public static bool CanSpy(bool knightIsAwake, bool archerIsAwake)
    {
        if((knightIsAwake == false and archerIsAwake ==true) or (knightIsAwake == true and archerIsAwake ==false)){
            print("Can Spy: True");
        }
    }
    CanSpy(false, true);