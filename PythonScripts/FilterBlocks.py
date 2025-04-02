# This script filters out blocks that have transparency, as well as any other blocks that would not work for a palette
# It then crops the blocks to 16x16
# The output is saved in the FilterBlocksOutput folder

# The input folder with the blocks must be called Blocks
# Will overwrite FilterBlocksOutput
import os
from PIL import Image
import shutil
import glob
from PIL import ImageOps
import csv
import cv2
import numpy as np

# function taken from internet
def hastransparency(img):
    if img.info.get("transparency", None) is not None:
        return True
    if img.mode == "P":
        transparent = img.info.get("transparency", -1)
        for _, index in img.getcolors():
            if index == transparent:
                return True
    elif img.mode == "RGBA":
        extrema = img.getextrema()
        if extrema[3][0] < 255:
            return True
    return False

#Takes an image and gets it ready to be added to the csv
def AddImage(file, img):
    fire_hard_includes = ["planks", "log", "leaves", "bamboo", "coal", "bee", "book", "kelp", "fence", "tnt"]
    fire_excludes = ["warped", "crimson"]
    fire_bool = False
    fire_bool2 = False
    #checking to see if the block is flammable
    for i in fire_hard_includes:
        for j in fire_excludes:
            if j in file:
                fire_bool2 = True
                break
        if fire_bool2:
            break
        if i in file:
            flammable.append(1)
            fire_bool = True
            break
    if not fire_bool:
        flammable.append(0)
    #formatting the name and png
    name = file[7:-4]
    images.append(file[7:])
    name = name.replace("_", " ")
    name = name.title()
    included_files.append(name)
    #getting the average color
    src_img = cv2.imread(file)
    average_color_row = np.average(src_img, axis=0)
    average_color = np.average(average_color_row, axis=0)
    new_average_color = ""
    for i in average_color:
        i = int(round(i))
        new_average_color = (hex(i)[2:]) + new_average_color 
    color_val.append(new_average_color)
    #adding image to output folder
    img.close()
    file2 = shutil.copy(file, "FilterBlocksOutput")
    img = Image.open(file2)
    w, h = img.size
    border = (0,h-16,0,0)
    img = ImageOps.crop(img, border)
    img.save(file2)
    return True

toggle_continue = False
folder = "Blocks"

#Delete previous output if there is one and make a new one
if os.path.isdir("FilterBlocksOutput"):
    files = glob.glob("FilterBlocksOutput/*png")
    for f in files:
        os.remove(f)
    os.rmdir("FilterBlocksOutput")
destination = os.mkdir("FilterBlocksOutput")

#Include and Exclude specific files
exclude = [folder + r"\debug.png", folder + r"\debug2.png", folder + r"\grass_block_top.png"]
hard_exclude = ["door", "jigsaw", "water", "suspicious", "bottom", "ejecting", "1", "2", "3", "4", "5", "flow", "command"]
include = [folder + r"\blue_stained_glass.png"] #Include stuff in here (for will)

#CSV holders
included_files = []
color_val = []
images = []
flammable = []

#check for image transparency and include/exclude
for file in glob.glob(folder+"/*png"):
    print(file)
    img = Image.open(file)
    for i in include:
        if file in i:
            toggle_continue = AddImage(file, img)
            break
    if toggle_continue:
        toggle_continue = False
        continue

    if hastransparency(img):
        img.close()
        continue
    else:
        if (file in exclude):
            img.close()
            continue
        for i in hard_exclude:
            if i in file:
                img.close()
                toggle_continue = True
                break
        if toggle_continue:
            toggle_continue = False
            continue
        AddImage(file, img)

#creating the csv file
with open ('blocks.csv', 'w', newline='') as csv_file:
    spamwriter = csv.writer(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for i in range(len(included_files)):
        row = [included_files[i],color_val[i], images[i], flammable[i]]
        spamwriter.writerow(row)
