package com.github.valkyrienyanko.template.commands;

import com.github.valkyrienyanko.template.utils.Utils;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;

public class CmdHelp extends Cmd {
    public boolean run(String command, String permission, CommandSender sender, Command cmd, String[] args) {
        if (super.run("help", "template.help", sender, cmd, args)) return false;

        sender.sendMessage(Utils.color("&2Helpful message!"));
        return true;
    }
}
