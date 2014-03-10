package com.xjy.redblacktree;

import java.util.*;

public class RedBlackTree {

	public static void main(String[] args) {
		int[] arr = { 18, 34, 8, 35, 81, 16, 36, 58, 95, 10 };
		RedBlackTree rbt = new RedBlackTree();
		for (int i = 0; i < 10; i++) {
			// rbt.insert( (int)Math.floor(Math.random() * 100) );
			rbt.insert(arr[i]);
		}
		 rbt.printTreeByString();
		//rbt.printTree();
	}

	private Node root = null;
	private Node nil = null;

	public RedBlackTree() {
	}

	public void insert(int v) {
		System.out.println("insert value = " + v);
		Node n = new Node(v);
		if (root != null) {
			Node it = root;
			Node vn = null;
			while (it != null) {
				vn = it;
				if (n.key <= it.key) {
					it = it.getLeft();
				} else {
					it = it.getRight();
				}
			}
			if (vn.key <= n.key) {
				vn.setRight(n);
			} else {
				vn.setLeft(n);
			}
			n.setParent(vn);
		} else {
			this.root = n;
		}
		insertCase1(n);
	}

	private void insertCase1(Node n) {
		if (n.getParent() == null) {
			root = n;
			root.color = Node.BLACK;
		} else {
			n.color = Node.RED;
			insertCase2(n);
		}
	}

	private void insertCase2(Node n) {
		if (!n.getParent().isBlack()) {
			insertCase3(n);
		}
	}

	private void insertCase3(Node n) {
		if (n.uncle() != null && !n.uncle().isBlack()) {
			n.getParent().black();
			n.uncle().black();
			n.grandParent().red();
			insertCase1(n.grandParent());
		} else {
			insertCase4(n);
		}
	}

	private void insertCase4(Node n) {
		if (n == n.getParent().getRight()
				&& n.getParent() == n.grandParent().getLeft()) {
			rotateLeft(n.getParent());
			n = n.getLeft();
		} else if (n == n.getParent().getLeft()
				&& n.getParent() == n.grandParent().getRight()) {
			rotateRight(n.getParent());
			n = n.getRight();
		}
		insertCase5(n);
	}

	private void insertCase5(Node n) {
		n.getParent().black();
		n.grandParent().red();
		if (n == n.getParent().getLeft()
				&& n.getParent() == n.grandParent().getLeft()) {
			rotateRight(n.grandParent());
		} else if (n == n.getParent().getRight()
				&& n.getParent() == n.grandParent().getRight()) {
			rotateLeft(n.grandParent());
		}
	}

	private void rotateLeft(Node n) {
		Node r = n.getRight();
		if (n.getParent() != null) {
			if (n == n.getParent().getLeft()) {
				n.getParent().setLeft(r);
			} else {
				n.getParent().setRight(r);
			}
		} else {
			root = r;
		}
		r.setParent(n.getParent());

		n.setRight(r.getLeft());
		if (r.getLeft() != null) {
			r.getLeft().setParent(n);
		}

		n.setParent(r);
		r.setLeft(n);
	}

	private void rotateRight(Node n) {
		Node l = n.getLeft();
		if (n.getParent() != null) {
			if (n == n.getParent().getRight()) {
				n.getParent().setRight(l);
			} else {
				n.getParent().setLeft(l);
			}
		} else {
			root = l;
		}
		l.setParent(n.getParent());

		n.setLeft(l.getRight());
		if (l.getRight() != null) {
			l.getRight().setParent(n);
		}

		n.setParent(l);
		l.setRight(n);
	}

	private void printTree() {
		LinkedList<Node> l = new LinkedList<Node>();
		l.add(root);
		while (l.size() != 0) {
			int s = l.size();
			for (int i = 0; i < s; i++) {
				Node n = l.poll();
				if (n.getLeft() != null) {
					l.add(n.getLeft());
				}
				if (n.getRight() != null) {
					l.add(n.getRight());
				}
				System.out.print(n.key + "  ");
			}
			System.out.println();
		}
	}

	private void printTreeByString() {
		System.out.println(root);
	}

	public static class Node {
		public static boolean RED = false;
		public static boolean BLACK = true;

		boolean color;
		int key;
		Node left;
		Node right;
		Node p;

		public Node(int key) {
			this.key = key;
		}

		public Node getParent() {
			return p;
		}

		public void setParent(Node p) {
			this.p = p;
		}

		public Node getLeft() {
			return left;
		}

		public void setLeft(Node left) {
			this.left = left;
		}

		public Node getRight() {
			return right;
		}

		public void setRight(Node right) {
			this.right = right;
		}

		public void black() {
			this.color = Node.BLACK;
		}

		public void red() {
			this.color = Node.RED;
		}

		public Node uncle() {
			if (this.p != null && this.p.getParent() != null) {
				return grandParent().getRight() == this.p ? grandParent()
						.getLeft() : grandParent().getRight();
			} else {
				return null;
			}
		}

		public Node grandParent() {
			return this.p.getParent();
		}

		public boolean isBlack() {
			return this.color;
		}

		@Override
		public String toString() {
			return "Node [color=" + (color == Node.BLACK ? "black":"red") + ", key=" + key + ", left=" + left + 
			", right=" + right + "]";
		}

	}
}
