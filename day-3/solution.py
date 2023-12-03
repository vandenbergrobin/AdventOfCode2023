import re
with open('input.txt') as f:
    lines = f.read()

lines = lines.splitlines()

chars = []
for line in lines:
	for char in line:
		if char not in ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']:
			if char not in chars:
				chars.append(char)

numbers = []
index = 0
for line in lines:
	line_numbers = re.findall(r'\d+', line)
	numbers.append(line_numbers)
	index += 1

total = 0
lineIndex = 0
for number in numbers:
	lastIndex = 0
	for val in number:

		# make sure not to find the same number twice, especially when it's a single digit number
		indexOf = lines[lineIndex].find(val, lastIndex)
		lastIndex = indexOf+1		

		# hadle finding the character before and after the number
		if indexOf == 0:
			charBefore = 'x'
		else:
			charBefore = lines[lineIndex][indexOf-1]
		if indexOf+len(val) == len(lines[lineIndex]):
			charAfter = 'x'
		else:
			charAfter = lines[lineIndex][indexOf+len(val)]

		# handle finding the characters above and below the number
		if lineIndex > 0:
			startIndex = indexOf-1 if indexOf-1 > 0 else 0
			charsLineAbove = lines[lineIndex-1][startIndex:indexOf+len(val)+1].replace('.', '')
			if len(charsLineAbove) == 0: charsLineAbove = '.'
			if len(charsLineAbove) > 1:
				charsLineAbove = charsLineAbove[0]
		else:
			charsLineAbove = 'x'

		if lineIndex < len(lines)-1:
			startIndex = indexOf-1 if indexOf-1 > 0 else 0
			charsLineBelow = lines[lineIndex+1][startIndex:indexOf+len(val)+1].replace('.', '')
			if len(charsLineBelow) == 0: charsLineBelow = '.'
			if len(charsLineBelow) > 1:
				charsLineBelow = charsLineBelow[0]
		else:
			charsLineBelow = 'x'

		if charBefore in chars or charAfter in chars or charsLineAbove in chars or charsLineBelow in chars:
			total += int(val)
	lineIndex += 1
print(total)