
import subprocess
import os
import time

cwd = os.getcwd()

frontend = subprocess.Popen('cd ' + cwd + '/tunein && npm start', shell=True)
backend = subprocess.Popen('cd ' + cwd + '/backend && npm start', shell=True)

try:
    while frontend.poll() is None and backend.poll() is None:
        time.sleep(5) # Check living subprocesses
except:
    frontend.kill()
    backend.kill()
