
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

    id = file[7:-4]
    while (True):
        if ("_top" in id):
            id = id.replace("_top", "")
        elif ("_bottom" in id):
            id = id.replace("_bottom", "")
        elif ("_side" in id):
            id = id.replace("_side", "")
        elif ("_front" in id):
            id = id.replace("_front", "")
        elif ("_back" in id):
            id = id.replace("_back", "")
        elif ("_east" in id):
            id = id.replace("_east", "")
        elif ("_west" in id):
            id = id.replace("_west", "")
        elif ("_north" in id):
            id = id.replace("_north", "")
        elif ("_south" in id):
            id = id.replace("_south", "")
        elif ("_inner" in id):
            id = id.replace("_inner", "")
        elif ("_lit" in id):
            id = id.replace("_lit", "")
        elif ("_powered" in id):
            id = id.replace("_powered", "")
        elif ("_log_lit" in id):
            id = id.replace("_log_lit", "")
        elif ("_open" in id):
            id = id.replace("_open", "")
        elif ("_closed" in id):
            id = id.replace("_closed", "")
        elif ("_on" in id):
            id = id.replace("_on", "")
        elif ("_off" in id):
            id = id.replace("_off", "")
        elif ("_base" in id):
            id = id.replace("_base", "")
        elif ("_honey" in id):
            id = id.replace("_honey", "")
        elif ("_plant" in id):
            id = id.replace("_plant", "")
        elif (id == "lava_still"):
            id = "lava_bucket"
        else:
            break
    block_names.append(id)

    #getting the average color
    src_img = cv2.imread(file)
    average_color_row = np.average(src_img, axis=0)
    average_color = np.average(average_color_row, axis=0)
    new_average_color = ""
    for i in average_color:
        i = int(round(i))
        if (len((hex(i)[2:]))) < 2:
            new_average_color = "0" + (hex(i)[2:]) + new_average_color
        else:
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
exclude = [folder + r"\bamboo_stalk.png", folder + r"\debug.png", folder + r"\debug2.png", folder + r"\grass_block_top.png"]
hard_exclude = ["lecturn", "particle", "repeater", "comparator", "test", "door", "jigsaw", "water", "suspicious", "bottom", "ejecting", "1", "2", "3", "4", "5", "flow", "command", "structure", "egg"]
include = [folder+ r"\spruce_leaves.png",folder+ r"\oak_leaves.png",folder+ r"\mangrove_leaves.png", folder+ r"\jungle_leaves.png",folder+ r"\dark_oak_leaves.png", folder+ r"birch_leaves.png", folder+ r"\acacia_leaves.png", folder+ r"\acacia_trapdoor.png", folder+r"\azalea_leaves.png",folder+r"\azalea_plant.png", folder+r"\bamboo_fence_gate.png", folder+r"\.png", folder+r"\bamboo_trapdoor.png", folder+r"\birch_trapdoor.png", folder+r"\black_stained_glass.png", folder+r"\blue_stained_glass.png", folder+r"\brown_stained_glass.png", folder+r"\cactus_side.png", folder+r"\caqve_vines.png", folder+r"\cave_vines_lit.png", folder+r"\chain.png", folder+r"\cherry_leaves.png", folder+r"\cherry_trapdoor.png", folder+r"\cobweb.png", folder+r"\copper_grate.png", folder+r"\copper_trapdoor.png", folder+r"\copper_trapdoor.png", folder+r"\crimson_trapdoor.png", folder+r"\cyan_stained_glass.png", folder+r"\dark_oak_trapdoor.png", folder+r"\dirt_path_side.png", folder+r"\dispenser_front.png", folder+r"\enchanting_table_side.png", folder+r"\end_portal_frame_side.png", folder+r"\exposed_copper_grate.png", folder+r"\exposed_copper_trapdoor.png", folder+r"\frosted_ice_zero.png", folder+r"\flowering_azalea_leaves.png", folder+r"\glass.png", folder+r"\gray_stained_glass.png", folder+r"\green_stained_glass.png", folder+r"\honey_block_bottom.png", folder+r"\honey_block_side.png", folder+r"\honey_block_top.png", folder+r"\ice.png", folder+r"\iron_bars.png", folder+r"\iron_trapdoor.png", folder+r"\jungle_trapdoor.png", folder+r"\ladder.png", folder+r"\light_blue_stained_glass.png", folder+r"\light_gray_stained_glass.png", folder+r"\lime_stained_glass.png", folder+r"\mangrove_stained_glass.png", folder+r"\mangrove_roots_side.png", folder+r"\mangrove_roots_top.png", folder+r"\mangrove_trapdoor.png", folder+r"\mud_bricks.png", folder+r"\mycelium_top.png", folder+r"\oak_trapdoor.png", folder+r"\orange_stained_glass.png", folder+r"\oxidized_copper_grate.png", folder+r"\oxidized_copper_trapdoor.png", folder+r"\pale_hanging_moss_tip.png", folder+r"\pale_oak_leaves.png", folder+r"\pale_oak_trapdoor.png", folder+r"\pink_petals.png", folder+r"\pink_stained_glass.png", folder+r"\purple_stained_glass.png", folder+r"\red_stained_glass.png", folder+r"\slime_block.png", folder+r"\spawner.png", folder+r"\spruce_trapdoor.png", folder+r"\tinted_glass.png", folder+r"\warped_trapdoor.png", folder+r"\weathered_copper_grate.png", folder+r"\weathered_copper_trapdoor.png", folder+r"\white_stained_glass.png", folder+r"\yellow_stained_glass.png",]

#CSV holders
included_files = []
color_val = []
images = []
flammable = []
block_names = []

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
        row = [included_files[i],color_val[i], images[i], flammable[i], block_names[i]]
        spamwriter.writerow(row)
