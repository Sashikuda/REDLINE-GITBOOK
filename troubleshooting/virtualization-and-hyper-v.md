For the complete documentation index, see [llms.txt](https://closetware.gitbook.io/instructions/llms.txt). This page is also available as [Markdown](https://closetware.gitbook.io/instructions/troubleshooting/virtualization-and-hyper-v.md).CopyOn this page[🛑Troubleshooting](/instructions/troubleshooting)# 💾Virtualization & Hyper-V

[](#enabling-virtualization)Enabling VirtualizationTo enable virtualization on your computer, follow these steps:

Restart your computer and enter the BIOS/UEFI settings. Typically, you can do this by pressing F2, Del, Esc, or F10 during the boot process. The exact key varies by manufacturer.

Once inside the BIOS/UEFI settings, navigate to the "Advanced" or "Advanced Mode" tab using the arrow keys.

Look for a setting named "Intel VT-x", "Intel Virtualization Technology", or "AMD-V" under "CPU Configuration" or "Processor Configuration".

Enable the setting by switching it to "Enabled".

Save the changes and exit by selecting "Save & Exit" or pressing F10. Your computer will reboot with virtualization enabled.

[](#enabling-hyper-v-on-windows)Enabling Hyper-V on WindowsTo enable Hyper-V on your Windows machine, follow these steps:

Open Control Panel and navigate to Programs > Turn Windows features on or off.

Scroll down and check the box next to Hyper-V.

Click OK to begin the installation process. Your computer might need to restart to complete the changes.

After the restart, Hyper-V will be enabled and ready for use.

Disabling Hyper-V on Windows

To disable Hyper-V on your Windows machine, follow these steps:

Open Control Panel and navigate to Programs > Turn Windows features on or off.

Scroll down and uncheck the box next to Hyper-V.

Click OK. Your computer might need to restart to apply the changes.

Disabling Hyper-V via PowerShell

To disable Hyper-V using PowerShell:

Open PowerShell as an administrator.

Execute the following command:

Last updated 1 year ago