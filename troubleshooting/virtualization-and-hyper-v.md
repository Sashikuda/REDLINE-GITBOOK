# 💻﹒Virtualization & Hyper-V

#### 

[](#enabling-virtualization)

Enabling Virtualization

To enable virtualization on your computer, follow these steps:

1.  **Restart your computer** and enter the BIOS/UEFI settings. Typically, you can do this by pressing `F2`, `Del`, `Esc`, or `F10` during the boot process. The exact key varies by manufacturer.
    
2.  Once inside the BIOS/UEFI settings, navigate to the **"Advanced"** or **"Advanced Mode"** tab using the arrow keys.
    
3.  Look for a setting named **"Intel VT-x"**, **"Intel Virtualization Technology"**, or **"AMD-V"** under **"CPU Configuration"** or **"Processor Configuration"**.
    
4.  Enable the setting by switching it to **"Enabled"**.
    
5.  Save the changes and exit by selecting **"Save & Exit"** or pressing `F10`. Your computer will reboot with virtualization enabled.
    

![](https://closetware.gitbook.io/instructions/~gitbook/image?url=https%3A%2F%2F1405695352-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FevyCKDKAd1b5TV2k3xZT%252Fuploads%252FnY0GIuKQ2ZLe4IPCwFNk%252Fimage.png%3Falt%3Dmedia%26token%3D1b2f974c-0e55-4579-9319-b29eda855941&width=768&dpr=3&quality=100&sign=d124e570&sv=2)

#### 

[](#enabling-hyper-v-on-windows)

Enabling Hyper-V on Windows

To enable Hyper-V on your Windows machine, follow these steps:

1.  Open **Control Panel** and navigate to **Programs** > **Turn Windows features on or off**.
    
2.  Scroll down and check the box next to **Hyper-V**.
    
3.  Click **OK** to begin the installation process. Your computer might need to restart to complete the changes.
    

After the restart, Hyper-V will be enabled and ready for use.

**Disabling Hyper-V on Windows**

To disable Hyper-V on your Windows machine, follow these steps:

1.  Open **Control Panel** and navigate to **Programs** > **Turn Windows features on or off**.
    
2.  Scroll down and uncheck the box next to **Hyper-V**.
    
3.  Click **OK**. Your computer might need to restart to apply the changes.
    

**Disabling Hyper-V via PowerShell**

To disable Hyper-V using PowerShell:

1.  Open **PowerShell** as an administrator.
    
2.  Execute the following command:
