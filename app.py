
import subprocess
import os

cwd = os.getcwd()

subprocess.Popen('cd ' + cwd + '/tunein && npm start', shell=True)
subprocess.Popen('cd ' + cwd + '/backend && npm start', shell=True)