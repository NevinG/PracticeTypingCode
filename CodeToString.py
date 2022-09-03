s = ""

with open('text.txt') as file:
    s = file.read()
    #condense more than two spaces in a row into a tab
    s = s.replace("    ", "_t")
    s = s.replace("\n", "_n")
    s = s.replace(" _n", "_n")
    s = s.replace("\"", "\\\"")
    file.close()

with open('output.txt', 'w') as file:
    file.write(s)
    file.close()