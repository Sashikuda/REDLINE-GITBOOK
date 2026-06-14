---
icon: 💔
---
# Corrupted Files

#### 

[](#how-to-fix-corrupted-files-using-cmd-in-windows)

How to Fix Corrupted Files Using CMD in Windows

1.  **Open Command Prompt as Administrator**: To start, you'll need to open the Command Prompt with administrative privileges. You can do this by typing `cmd` in the Windows search bar, right-clicking on **Command Prompt**, and selecting **Run as administrator**.
    
2.  **Run the System File Checker (SFC) Tool**: The SFC tool will scan and attempt to repair corrupted system files. Type the following command and press Enter:
    
    Copy
    
        sfc /scannow
    
3.  **Wait for the Process to Complete**: The scan may take some time. If any issues are found, the SFC tool will attempt to fix them automatically.
    
4.  **Verify the Results**: Once the scan completes, you'll see a message indicating if any corrupted files were found and fixed. If issues persist, proceed to the next step.
    
5.  **Use DISM Tool for Further Repairs**: If SFC cannot repair the problem, use the Deployment Imaging Service and Management Tool (DISM) for more extensive repairs. Run the following command:
    
    Copy
    
        DISM /Online /Cleanup-Image /RestoreHealth
    
6.  **Reboot Your System**: After DISM completes its process, reboot your computer to ensure all repairs are applied correctly.
    

6
