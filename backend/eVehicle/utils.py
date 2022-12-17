import matplotlib.dates as md
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg
from dash.dependencies import Output
from dash.dependencies import Input
from dash import html
from dash import dcc
import numpy as np
# you have already created UserSerializer
from .serializers import UserSerializer

import os
from time import time_ns

import dash
import matplotlib
import matplotlib as mpl
import matplotlib.pyplot as plt

matplotlib.use("agg")


def calculateCost(start, end, price):
    time = end-start
    minutes = time.seconds / 60
    return round(minutes*price, 2), time, minutes


def checkBalance(balance, payment):
    return balance-payment


def barGraph(x_data, y_data, hub):
    hub = hub.replace(" ", "")
    fig = Figure()
    ax = fig.add_subplot(111)

    ax.set_xticklabels(x_data, rotation=45)
    # Random dist plot
    y_data = [round(i, 2) for i in y_data]
    ax.bar(x_data, y_data)
    # for i, v in enumerate(y_data):
    #     ax.text(i, v, str(value))
    print(x_data, "---------------")
    for i in range(len(x_data)):
        ax.text(i, y_data[i], y_data[i], ha='center')

    # Axes label properties
    # ax.set_title("Figure Title", size=26)
    # ax.set_xlabel("X Label", size=14)
    # ax.set_ylabel("Y Label", size=14)

    # Make the PNG
    canvas = FigureCanvasAgg(fig)
    # The size * the dpi gives the final image size
    #   a4"x4" image * 80 dpi ==> 320x320 pixel image
    fig_path = f"../start_pages/src/graphs/hub_bar_"+hub+".png"
    canvas.print_figure(fig_path, dpi=150, bbox_inches="tight")
    return fig_path


def pieGraph(data, hub, labels):
    hub = hub.replace(" ", "")
    fig = Figure()
    ax = fig.add_subplot(111)
    newdata, newlabels = [], []
    for i in range(len(data)):
        if data[i] != 0:
            newdata.append(data[i])
            newlabels.append(labels[i])
    total = sum(newdata)
    ax.pie(newdata, labels=newlabels, autopct=lambda p: '{:.0f}'.format(
        p * total / 100), startangle=90)

    # Make the PNG
    canvas = FigureCanvasAgg(fig)
    # The size * the dpi gives the final image size
    #   a4"x4" image * 80 dpi ==> 320x320 pixel image
    fig_path = f"../start_pages/src/graphs/pie_" + hub + ".png"
    canvas.print_figure(fig_path, dpi=150, bbox_inches="tight")
    return fig_path


def lineGraph(x_data, y_data, hub):
    hub = hub.replace(" ", "")
    fig = Figure()
    ax = fig.add_subplot(111)

    # Random dist plot
    ax.set_xticklabels(x_data, rotation=45)
    xfmt = md.DateFormatter('%m-%d %H:%M')
    ax.xaxis.set_major_formatter(xfmt)
    ax.scatter(x_data, y_data)
    ax.plot(x_data, y_data)
    # Make the PNG
    canvas = FigureCanvasAgg(fig)
    # The size * the dpi gives the final image size
    #   a4"x4" image * 80 dpi ==> 320x320 pixel image
    fig_path = f"../start_pages/src/graphs/line_"+hub+".png"
    canvas.print_figure(fig_path, dpi=150, bbox_inches="tight")
    return fig_path
