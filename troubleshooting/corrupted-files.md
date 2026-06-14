For the complete documentation index, see [llms.txt](https://closetware.gitbook.io/instructions/llms.txt). This page is also available as [Markdown](https://closetware.gitbook.io/instructions/troubleshooting/corrupted-files.md).CopyOn this page[🛑Troubleshooting](/instructions/troubleshooting)# 💔Corrupted Files

[](#how-to-fix-corrupted-files-using-cmd-in-windows)How to Fix Corrupted Files Using CMD in WindowsOpen Command Prompt as Administrator: To start, you'll need to open the Command Prompt with administrative privileges. You can do this by typing cmd in the Windows search bar, right-clicking on Command Prompt, and selecting Run as administrator.

Run the System File Checker (SFC) Tool: The SFC tool will scan and attempt to repair corrupted system files. Type the following command and press Enter:

Copysfc /scannowWait for the Process to Complete: The scan may take some time. If any issues are found, the SFC tool will attempt to fix them automatically.

Verify the Results: Once the scan completes, you'll see a message indicating if any corrupted files were found and fixed. If issues persist, proceed to the next step.

Use DISM Tool for Further Repairs: If SFC cannot repair the problem, use the Deployment Imaging Service and Management Tool (DISM) for more extensive repairs. Run the following command:

CopyDISM /Online /Cleanup-Image /RestoreHealthReboot Your System: After DISM completes its process, reboot your computer to ensure all repairs are applied correctly.

6

Last updated 1 year ago