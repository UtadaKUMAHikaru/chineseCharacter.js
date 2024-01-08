import os

def list_files(startpath):
    for root, dirs, files in os.walk(startpath, topdown=True):
        dirs[:] = [d for d in dirs if d != '.git']  # Skip .git directories
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print(f'{subindent}{f}')

# 用法示例，使用当前目录作为起始路径
if __name__ == "__main__":
    print("Directory structure of the current folder:")
    list_files(".")
