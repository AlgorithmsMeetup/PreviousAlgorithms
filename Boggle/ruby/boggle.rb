#require 'yaml'
#require 'debugger'

# Made at HackReactor JS Algo Meetup on 2/10/2014
# Problem:

# Given an N x N grid of random letters
# How many English (or any dictionary) words can you find in the grid?
# like the 'Boggle' game, usually 3 x 3
# Words can go diagonally, just must be touching
# Cannot repeat letters
# Must be at least 3 letters

myboard = [	['t','a','b','c'],
			['h','d','e','f'],
			['e','i','r','s'],
			['n','t','u','v']   ]
dictionary = [ 'the', 'then', 'their' ]

# goes to the dictionary and checks if the argument is a 'valid' string
def found_match(str)
	if dictionary.include?(str) # returns true if found in the dictionary
		return str # don't stop the recursion, but return the word ?
	end
	false
end

def valid?(str)
	dictionary.any? { |word| (word.include?(str) && word[0] == str[0]) }
	# returns true if any word in the dictionary includes the (sub)string
	# add a condition where str[0] == word[0] so as to avoid false positives for substrings
	# e.g. without that condition 'ir' would be true because 'ir' is part of 'their' but 'ir' is not a valid word in the dictionary, thanks to Nick (#MrNice@git) for pointing this out
end

def search(board,x,y)
	results = []

	if (board[y][x] == 'counted') || (y < 0 || x < 0 || y > board.count-1 || x > board[y].count-1) 
		# either way it's a match or we already counted it
		# or we fell off the board
		# either way we don't want to count it twice
		return '' # **
	end

	match = board[y][x]
	board[y][x] = 'counted'
	# recursively send out search 
	# top row
	match = match + search(board, y-1, x-1)
	match = match + search(board, y-1, x)
	match = match + search(board, y-1, x+1)
	# middle row
	match = match + search(board, y, x-1)
	match = match + search(board, y, x+1)
	# bottom row
	match = match + search(board, y+1, x-1)
	match = match + search(board, y+1, x)
	match = match + search(board, y+1, x+1)
	
	if valid?(match)
		if found_match(match)
			results << match
		end
	else
		return '' # if not a valid substring exit this branch
	end

	results
end

puts search(myboard,2,2).inspect # ==> ["the", "then", "their"]